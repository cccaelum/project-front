import {Link} from 'react-router-dom'
const Reminders = ({data}) => {
  return (
    <>
    <h2>Lista de recordatorios</h2>
    <ul>
      {data.map(item => (
        <li key={item._id}>
          <Link to={`reminders/${item._id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
    </>
  )
};

export default Reminders;