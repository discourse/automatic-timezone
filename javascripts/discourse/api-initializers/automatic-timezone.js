import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  const currentUser = api.getCurrentUser();
  if (!currentUser) {
    return;
  }

  const browserTimezone = moment.tz.guess();
  const lastDetectedTimezone = currentUser.timezone;
  const wasManuallySet =
    currentUser.custom_fields?.manually_set_timezone === "true";

  if (!wasManuallySet || browserTimezone !== lastDetectedTimezone) {
    currentUser.set("timezone", browserTimezone);
    currentUser.set("custom_fields.manually_set_timezone", "false");
    try {
      currentUser.save();
    } catch {
      currentUser.set("timezone", lastDetectedTimezone);
    }
  }

  api.registerUserProfileBeforeSaveCallback((userModel) => {
    if (userModel.timezone !== browserTimezone) {
      userModel.set("custom_fields.manually_set_timezone", "true");
    }
  });
});
