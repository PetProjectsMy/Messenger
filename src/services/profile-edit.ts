import { ProfileAPI } from "api";
import {
  APIResponseHasError,
  transformProfileAPIResponseToUserData as transformData,
} from "utils/api";

class ProfileServiceClass {
  async getUserProfile(userID: number) {
    const request = await ProfileAPI.getProfileData(userID);
    const { status, response } = request;

    console.log(
      `PROFILE GET ID(${userID})REQUEST: status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    return response;
  }

  async changeUserProfile(data: TProfileChangeDTO) {
    const request = await ProfileAPI.changeProfile(data);
    const { status, response } = request;

    console.log(
      `PROFILE CHANGE DATA REQUEST: status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    if (!APIResponseHasError(response)) {
      const userData = transformData(response);
      window.store.dispatch({
        user: userData,
      });
    }

    return response;
  }

  async changeUserAvatar(
    avatarFormData: FormData,
    afterRequestCallback: (response: any) => void = () => {}
  ) {
    const request = await ProfileAPI.changeAvatar(avatarFormData);
    const { status, response } = request;

    console.log(
      `PROFILE CHANGE AVATAR REQUEST: status ${status}; response: ${JSON.stringify(
        response
      )}`
    );

    afterRequestCallback(response);
    return response;
  }
}

export const ProfileService = new ProfileServiceClass();
