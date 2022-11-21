import { EnumAppPages } from "pages/enum-app-pages";
import { isNullish, isObject } from "utils/objects-handle";

export function userSetter(
  oldValue: Nullable<TAppUserData>,
  newValue: Nullable<TAppUserData>
) {
  const pageType = this.state.page;
  const { page } = this;

  switch (pageType as EnumAppPages) {
    case EnumAppPages.Profile:
      if (isNullish(newValue)) {
        throw new Error("User Can't Be Nullified On Profile Page");
      }
      if (!isObject(oldValue) || !oldValue) {
        throw new Error(`Incorrect User State ${oldValue} On Profile Page`);
      }

      if (oldValue.avatar !== newValue!.avatar) {
        page.updateUserAvatar();
      }
      page.updateUserInfo();

      break;
    case EnumAppPages.Navigation:
      if (isNullish(oldValue) !== isNullish(newValue)) {
        page.createLinks();
      }
      break;
    default:
  }
}
