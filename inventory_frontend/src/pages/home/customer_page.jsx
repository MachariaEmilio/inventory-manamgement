import Button from "../../components/button";

function Customer_page() {
  return (
    <>
      <h2>Customer page : login page </h2>
      <form className="admin_form" action="">
        <label htmlFor="name ">enter your name </label>
        <input type="text" />
        <label htmlFor="password">enter your password</label>{" "}
        <input type="password" />
        <Button type="submit " name="submit" />{" "}
      </form>
    </>
  );
}

export default Customer_page;
