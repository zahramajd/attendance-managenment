export default async function ({
  app,
  store,
  redirect
}) {
  const {
    user
  } = await app.$axios.$get('user')

  if (!user) {
    return redirect('/login')
  }

  store.commit('SET_USER', user)
}
