import axios from "axios"

const signup = (username, password, age, siteLanguage) => {
  return axios.post("/auth/signup", {
    username: username,
    password: password,
    age: age,
    siteLanguage: siteLanguage
  }).then(response => {
    return response.data
  }).catch(err => {
    return err.response.data
  })

}


const login = (username, password) => {
  return axios.post("/auth/login", {
    username: username,
    password: password
  }).then(response => {
    console.log(response.data.siteLanguage)
    return response.data
  }).catch(err => {
    return err.response.data
  })
}

const logout = () => {
  axios.delete("/auth/logout")
}

export { signup, login, logout };