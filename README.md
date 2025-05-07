(WIP) Vue3 Frontend for the LoginSys Backend. For learning purposes, and give a visual to the backend project.

Points of interest:

- The MfaView.vue Component: Tried to change the focus to the next input field while typing the code.
- The RecoveryView.vue View: It changes the component depending on the state.
- Dockerfile: The instructions for its containerization.
- nginx.conf file: It has the configuration that lets the frontend sends the API calls to the backend as intended when using Docker.

Things that need to be fixed:

- Footbar doesn´t stay in the bottom of the page
- MFA doesn't get sent by pressing enter like login does
- Modify the lorem ipsum text to an actual welcome text
- Add more style to the logged component.
- Add the neccessary components when a new backend feature is added (Like the in-progress chat rooms).
