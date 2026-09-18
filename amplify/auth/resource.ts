import { defineAuth } from '@aws-amplify/backend'

/**
 * Admin accounts only — there is no public sign-up flow. Create each
 * teammate's login from the Cognito User Pool console (or `aws cognito-idp
 * admin-create-user`), not through the app. Everyone with an account has
 * full access; there are no roles/groups.
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
})
