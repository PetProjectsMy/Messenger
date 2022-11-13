import { EnumAppPages } from "pages";
import { isObject } from "utils/objects-handle";

export function userSetter(
  oldValue: Nullable<TAppUserData>,
  newValue: Nullable<TAppUserData>
) {
  switch (this.state.page as EnumAppPages) {
    case EnumAppPages.Profile:
      if (!newValue) {
        throw new Error("User Can't Be Nullified On Profile Page");
      }
      if (!isObject(oldValue) || !oldValue) {
        throw new Error(`Incorrect User State ${oldValue} On Profile Page`);
      }

      if (oldValue.avatar !== newValue.avatar) {
        this.page.avatarDidUpdate();
      }
      this.page.userDidUpdate();

      break;
    default:
  }
}
