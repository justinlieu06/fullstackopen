// Exercise 1.1
// const Header = (props) => {
//   return (
//     <h1>
//       {props.header}
//     </h1>
//   )
// }


// Exercise 1.5
const Header = (props) => {
  return (
    <h1>
      {props.data.name}
    </h1>
  )
}

// Exercises 1.1-1.2
// const Content = (props) => {
//   return (
//     <>
//       {props.data.map((ele, idx)=>{
//         return <p key={idx}>
//           <Part content={ele[0]} total={ele[1]} />
//         </p>
//       })}
//     </>
//   )
// }

// Exercise 1.3
// const Content = (props) => {
//   return (
//     <>
//       <Part content={props.name} total={props.exercises} />
//     </>
//   )
// }

// Exercise 1.4
// const Content = (props) => {
//   return (
//     <>
//       {props.data.map((ele, idx)=>{
//         return <p key={idx}>
//           <Part content={ele.name} total={ele.exercises} />
//         </p>
//       })}
//     </>
//   )
// }

// Exercise 1.5
const Content = (props) => {
  return (
    <>
    {props.data.parts.map((ele, idx)=>{
      return <p key={idx}>
        <Part content={ele.name} total={ele.exercises} />
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
  // exercises 1.1-1.2
  // const course = 'Half Stack application development'
  // index 0 will be part and index 1 will be exercise count
  // let data = [
  //   ['Fundamentals of React', 10],
  //   ['Using props to pass data',7],
  //   ['State of a component', 14]
  // ]

  // exercises 1.3
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  // exercise 1.4
  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      {/* 1.1-1.2 */}
      {/* <Content data={data} /> */}
      {/* <Header header={course} /> */}

      {/* 1.3 */}
      {/* <Content name={part1.name} exercises={part1.exercises} />
      <Content name={part2.name} exercises={part2.exercises} />
      <Content name={part3.name} exercises={part3.exercises} /> */}

      {/* 1.4 */}
      {/* <Content data={parts} /> */}

      {/* 1.5 */}
      <Header data={course} />
      <Content data={course} />

    </div>
  )
}

export default App