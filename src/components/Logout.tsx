import { doLogout } from "@/app/actions";

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className="bg-red-500" type="submit" name="action" value="logout">
        logout
      </button>
    </form>
  );
};

export default Logout;
