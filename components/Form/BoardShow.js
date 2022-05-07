function BoardShow ({title,select}) {
  return (
    <div className="flex flex-col">
        <div className="p-5 bg-black-100 mt-5 rounded-t-2xl shadow-sm">
            <p className="font-medium">{title}</p>
            <p className="text-xs text-white">{select}</p>
        </div>
      
    </div>
  )
}

export default BoardShow
