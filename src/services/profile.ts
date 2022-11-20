import { ProfileAPI } from "api";
import {
  APIResponseHasError,
  transformProfileAPIResponseToUserData,
} from "utils/api";

class ProfileServiceClass {
  async getUserProfile(userID: number) {
    let status;
    let response;

    try {
      const request = await ProfileAPI.getProfileData(userID);
      status = request.status;
      response = request.response;

      console.log(
        `PROFILE WITH ID(${userID}) GET REQUEST: status ${status}; response: ${JSON.stringify(
          response
        )}`
      );

      if (!APIResponseHasError(response)) {
        const user = transformProfileAPIResponseToUserData(response);
        window.store.dispatch({ user });
      }
    } catch (error) {
      console.error(`PROFILE WITH ID(${userID}) GET REQUEST ERROR: ${error}`);
      throw error;
    }

    return response;
  }

  async changeUserProfile(
    data: TProfileChangeDTO,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    let status;
    let response;

    try {
      const request = await ProfileAPI.changeProfile(data);
      status = request.status;
      response = request.response;

      console.log(
        `PROFILE CHANGE REQUEST: status ${status}; response: ${JSON.stringify(
          response
        )}`
      );

      if (afterRequestCallback) {
        await afterRequestCallback(response);
      }
    } catch (error) {
      console.error(`PROFILE CHANGE REQUEST GET REQUEST ERROR: ${error}`);
      throw error;
    }

    return response;
  }

  async changeUserAvatar(
    avatarFormData: FormData,
    afterRequestCallback?: TAfterRequestCallback
  ) {
    let status;
    let response;

    try {
      const request = await ProfileAPI.changeAvatar(avatarFormData);
      status = request.status;
      response = request.response;

      console.log(
        `PROFILE CHANGE AVATAR REQUEST: status ${status}; response: ${JSON.stringify(
          response
        )}`
      );

      if (afterRequestCallback) {
        await afterRequestCallback(response);
      }
    } catch (error) {
      console.error(
        `PROFILE CHANGE AVATAR REQUEST GET REQUEST ERROR: ${error}`
      );
      throw error;
    }

    return response;
  }
}

export const ProfileService = new ProfileServiceClass();
