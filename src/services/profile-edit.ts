import { ProfileAPI } from "api";
import {
  APIResponseHasError,
  transformProfilChangeAPIResponseToAppUserData as transformData,
} from "utils/api";

class ProfileEditServiceClass {
  async changeUserProfile(data: TProfileChangeDTO) {
    const requestChangeProfile = await ProfileAPI.changeProfile(data);
    const { status, response } = requestChangeProfile;

    console.log(
      `PROFILE CHANGE REQUEST:\nstatus ${status}; response: ${JSON.stringify(
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
}

export const ProfileEditService = new ProfileEditServiceClass();
