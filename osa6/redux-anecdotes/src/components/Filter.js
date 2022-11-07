import { setFilter } from "../reducers/filterReducer"
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={props.setFilter} />
    </div>
  )
}

export default connect(
  null, 
  { setFilter })(Filter)
