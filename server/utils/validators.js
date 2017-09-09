// import axios from 'axios';

// export default function(dispatch, token) {
//   if (token) {
//     axios.post(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
//     .then((res) => {
//       User.findOne({
//         where: {
//           email: res.data.email
//         }
//       }).then((user) => {
//         if (user) {
//           req.userdata = user.dataValues;
//           return next();
//         }
//         if (/@andela.com\s*$/.test(res.data.email)) {
//           User.create({
//             fullname: res.data.name,
//             avatar: res.data.picture,
//             email: res.data.email
//           }).then((newUser) => {
//             req.userdata = newUser;
//             return next();
//           })
//         }
//       })
//     }, () => {
//       return res.status(400).send({
//         message: 'Authentication failed!',
//       })
//     })
//   }
// }