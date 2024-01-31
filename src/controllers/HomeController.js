import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_USERS_API_URL,
});
console.log("BaseURL:", process.env.VUE_APP_USERS_API_URL);
export default {
  createUser: async function (data) {
    try {
      console.log("data :", data);
      const response = await instance.post("user", data);
      return response;
    } catch (error) {
      console.error("Error creating User:", error);
      return {
        data: {
          flag: false,
          error: `An error occurred while creating User. ${
            error.message || error
          }`,
        },
      };
    }
  },
  getUser: async function () {
    try {
      const response = await instance.get("user");
      console.log("response printing",response);
      if (response.data.flag) {
        return {
          status: 200,
          data: response.data.users,
        };
      } else {
        return {
          status: 500,
          error: response.data.error,
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while fetching user data. ${
          error.message || error
        }`,
      };
    }
  },
  deleteUser: async function (idsToDelete) {
    console.log("delete selected id", idsToDelete);

    try {
      const response = await instance.delete(
        "user",
        {
          data: {
            ids: idsToDelete,
          },
        },
      );
      console.log("delete:",response);
      return response;
    } catch (error) {
      console.error('Error deleting user:', error);
      return {
        data: {
          flag: false,
          error: `An error occurred while deleting the user. ${error.message || error}`,
        },
      };
    }
  },
  updateUser: async function (
    userId,updatedData
  ) {
    try {
      const response = await instance.put(`/user/${userId}`, updatedData);
        
      return response;
    } catch (error) {
      return error.response;
    }
  },
 
};
