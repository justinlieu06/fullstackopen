const Header = (props) => {
  return (
    <h1>
      {props.header}
    </h1>
  )
}

const Content = (props) => {
  return (
    <>
      {props.data.map((ele, idx)=>{
        return <p key={idx}>
          <Part content={ele[0]} total={ele[1]} />
        </p>
      })}
    </>
  )
}

const Total = (props) => {
  return (
    <>
      {props.total}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      {props.content} {props.total}
    </>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  // index 0 will be part and index 1 will be exercise count
  let data = [
    ['Fundamentals of React', 10],
    ['Using props to pass data',7],
    ['State of a component', 14]
  ]

  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  return (
    <div>
      <Header header={course} />
      <Content data={data} />
    </div>
  )
}

export default App