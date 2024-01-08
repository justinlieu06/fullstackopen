// a person's data consists of name and number
const Person = ({name, number, id}) => {
  // delete person with specified id
  const deletePerson = (id) => {
    let txt;
    if (confirm("Press a button!")) {
      txt = "You pressed OK!";
    } else {
      txt = "You pressed Cancel!";
    }
  }

    return (
        <li>
        {name} : {number} <button onclick={deletePerson}>Delete</button>
        </li>
    )
}


export default Person
