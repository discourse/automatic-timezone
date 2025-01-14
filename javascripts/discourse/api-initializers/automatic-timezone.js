import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) {
    return;
  }

  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const lastDetectedTimezone =
    currentUser.custom_fields?.last_detected_timezone;
  const wasManuallySet =
    currentUser.custom_fields?.manually_set_timezone === "true";

  if (!wasManuallySet || browserTimezone !== lastDetectedTimezone) {
    currentUser.set("timezone", browserTimezone);
    currentUser.set("custom_fields.last_detected_timezone", browserTimezone);
    currentUser.set("custom_fields.manually_set_timezone", "false");
    currentUser.save();
  }

  api.modifyClass("controller:preferences/interface", {
    pluginId: "auto-timezone",

    actions: {
      save() {
        if (this.model.timezone !== browserTimezone) {
          this.model.set("custom_fields.manually_set_timezone", "true");
          this.model.set(
            "custom_fields.last_detected_timezone",
            browserTimezone
          );
        }
        return this._super(...arguments);
      },
    },
  });
});
