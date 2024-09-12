
const Footer = () => {
    const year = new Date().getFullYear()

  return (
<footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
  <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
  @
  {
    //use js to write year
   year
  }
  <span> </span>
    Copyright: <a href="/">FlexJobs</a>
  </div>
</footer>  )
}

export default Footer