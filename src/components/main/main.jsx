import './main.css';

const Main = () => {
    return (
        <main className='main'>
            <h1>Welcome to SportSee</h1>
            <p>Your personal fitness dashboard</p>
            <p>API URL: {import.meta.env.VITE_DATA}</p>
        </main>
    )
}

console.log(import.meta.env.VITE_DATA);

export default Main;