import { EnumAppPages } from "pages/enum-app-pages";
import { isNullish, isObject } from "utils/objects-handle";

export function userSetter(
  this: StoreTypings.Store,
  oldValue: Nullable<StoreTypings.UserData>,
  newValue: Nullable<StoreTypings.UserData>
) {
  const pageType = this.getCurrentPageType();
  const pageObject = this.getCurrentPageObject();

  switch (pageType as EnumAppPages) {
    case EnumAppPages.Profile:
      if (isNullish(newValue)) {
        throw new Error("User Can't Be Nullified On Profile Page");
      }
      if (!isObject(oldValue) || !oldValue) {
        throw new Error(`Incorrect User State ${oldValue} On Profile Page`);
      }

      if (oldValue.avatar !== newValue.avatar) {
        (pageObject as PagesTypings.ProfilePage).updateUserAvatar();
      }
      (pageObject as PagesTypings.ProfilePage).updateUserInfo();

      break;
    case EnumAppPages.Navigation:
      if (isNullish(oldValue) !== isNullish(newValue)) {
        (pageObject as PagesTypings.NavigationPage).init();
      }
      break;

    default:
  }
}
