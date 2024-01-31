<template>
  <div>
    <h1>DASHBOARD</h1>
    <v-btn @click="openDialog" class="create" rounded depressed> Create </v-btn>

    <!-- Dialog for creating user -->
    <v-dialog max-width="887px" v-model="dialog" persistent center>
      <v-card>
        <v-card-title>Create User</v-card-title>
        <v-card-text>
          <v-text-field v-model="firstname" label="First Name"></v-text-field>
          <v-text-field v-model="lastname" label="Last Name"></v-text-field>
          <v-text-field
            v-model="contactNumber"
            label="Contact Number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveUser">Save</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Display entries in v-data-table -->
    <v-data-table
      :items="entries"
      :headers="headers"
      hide-default-footer
      fixed-header
      v-model="selected"
      show-select
      class="rounded-table"
      :single-select="singleSelect"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20, 50, 100],
      }"
    >
     
      <template v-slot:[`items.firstname`]="{ item }">
        {{ item.firstname }}
      </template>
      <template v-slot:[`items.lastname`]="{ item }">
        {{ item.lastname }}
      </template>
      <template v-slot:[`items.contactNumber`]="{ item }">
        {{ item.contactNumber }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon class="mr-2 pa-4" @click="updateData(item)">
          <img
            width="36px"
            height="36px"
            class="cursor"
            src="../assets/edit.svg"
          />
        </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title v-if="selected.length === 1"
            >Selected {{ selected.length }} item</v-toolbar-title
          >
          <v-toolbar-title v-else-if="selected.length > 1"
            >Selected {{ selected.length }} items</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="deleteSelected" :disabled="selected.length === 0">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
  
  <script>
import HomeController from "@/controllers/HomeController";

export default {
  data() {
    return {
      dialog: false,
      firstname: "",
      editId: null,
      lastname: "",
      contactNumber: "",
      singleSelect: false,
      selected: [],
      entries: [], 
      headers: [
        { text: "First Name", value: "firstname" },
        { text: "Last Name", value: "lastname" },
        { text: "Contact Number", value: "contactNumber" },
        { text: "Actions", value: "actions" }, 
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.firstname = "";
      this.lastname = "";
      this.contactNumber = "";
    },
    async saveUser() {
      try {
        if (this.editId) {
        
          const response = await HomeController.updateUser(this.editId, {
            firstname: this.firstname,
            lastname: this.lastname,
            contactNumber: this.contactNumber,
          });

          console.log("User Updated:", response.message);
        } else {
          // Creating a new user
          const response = await HomeController.createUser({
            firstname: this.firstname,
            lastname: this.lastname,
            contactNumber: this.contactNumber,
          });

          console.log("New User Created:", response.message);
        }

        // Clear input fields and reset editingUser
        this.firstname = "";
        this.lastname = "";
        this.contactNumber = "";
        this.editId = null;

        this.closeDialog();
        this.fetchUser();
      } catch (error) {
        console.error("Error saving user:", error);
        // Handle error as needed
      }
    },

    async fetchUser() {
      try {
        const response = await HomeController.getUser();

        if (response.status === 200) {
         
          this.entries = response.data;
          console.log("entries..", this.entries);
        } else {
          console.error("Error fetching user data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async deleteSelected() {
      console.log("chk1");
      const idsToDelete = []; 

      this.selected.forEach((user) => {
        idsToDelete.push(user.id);
      });

      try {
        const response = await HomeController.deleteUser(idsToDelete);
        console.log("Response for user IDs", idsToDelete, response);

        // Optionally, remove the deleted users from the local entries array
        idsToDelete.forEach((userId) => {
          const index = this.entries.findIndex((entry) => entry.id === userId);
          if (index !== -1) {
            this.entries.splice(index, 1);
          }
        });

        // Clear the selection after deletion
        this.selected = [];
      } catch (error) {
        console.error("Error deleting users:", error);
      }
    },

    updateData(item) {
      this.editId = item.id; 
      this.formbtnBool = true; 
      this.dialog = true;
      this.firstname = item.firstname;
      this.lastname = item.lastname;
      this.contactNumber = item.contactNumber;
    },
  },
  created() {
  
    this.fetchUser();
  },
};
</script>
<style scoped>
</style>
  