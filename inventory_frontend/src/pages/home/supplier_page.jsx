import Button from "../../components/button";

function Supplier_page() {
  return (
    <>
      <h2>Supplier panel : login page </h2>
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

export default Supplier_page;