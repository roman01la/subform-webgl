class InteractionManager {
  viewInFocus = undefined;
  isViewInFocus(view) {
    return this.viewInFocus === view;
  }
  setViewInFocus(view) {
    if (this.viewInFocus !== undefined) {
      const { onFocusOut } = this.viewInFocus;
      if (typeof onFocusOut === "function") {
        onFocusOut();
        delete this.viewInFocus.onFocusOut;
      }
    }

    this.viewInFocus = view;
  }
}

export const im = new InteractionManager();

export default InteractionManager;
