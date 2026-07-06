function App() {
  window.Telegram?.WebApp?.ready();

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user
  const theme = window.Telegram?.WebApp?.themeParams

  return (
    <>
      <div className='text-large border p-10'>привет {user?.first_name}!</div>
      <div className='text-large border p-15'>твой цвет текста: {theme?.text_color}!!!</div>
    </>
  )
}

export default App
