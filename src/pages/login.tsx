import Link from 'next/link'

function Login() {
  return (
    <div className="max-h-screen h-screen flex flex-col justify-center items-center bg-primary">
      <div>เข้าสู่ระบบ TFPERS</div>
      <div className="bg-white">
        <div className="flex flex-col">
          <label>บัญชีผู้ใช้หรืออีเมล</label>
          <input type="text" placeholder="บัญชีผู้ใช้หรืออีเมล"/>
        </div>
        <div className="flex flex-col"> 
          <label>บัญชีผู้ใช้หรืออีเมล</label>
          <input type="text" placeholder="บัญชีผู้ใช้หรืออีเมล"/>
        </div>
      </div>
      <Link href='/'>Back</Link>
    </div>
  )
}

export default Login