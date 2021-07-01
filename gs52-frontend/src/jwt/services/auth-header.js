

export default function authHeader() {

  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user.accessToken);
  console.log(user.accessToken.Authorization);

  if (user && user.accessToken) {
    console.log('user.accessToken : ' + user.accessToken);
    // return { Authorization: 'Bearer ' + this.state.accessToken }; 
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { };
  }
}

