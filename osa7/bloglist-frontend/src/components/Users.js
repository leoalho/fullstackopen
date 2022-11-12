import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <td></td>
          <td>
            <b>Blogs created</b>
          </td>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <a href={"/users/" + user.id}>{user.name}</a>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
