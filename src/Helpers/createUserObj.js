export default function createUserObj(
  authUser = {},
  userData = {},
  userJourney = []
) {
  const newUser = {
    uid: userData.id,
    username: `${userData.name} ${userData.surname}`,
    name: userData.name,
    surname: userData.surname,
    email: authUser.email,
    profileImage: authUser.photoURL,
    lastSignIn: authUser.metadata.lastSignInTime,
    admin: userData.admin,
    cohort: userData.cohort,
    currentRole: userData.currentrole,
    currentEmployer: userData.currentemployer,
    skills: userData.skills,
    social: userData.social,
    introduction: userData.introduction,
    journey: userJourney,
  };

  return newUser;
}
