import Layout from '../components/Layout/Layout';
import RegisterForm from '../components/Login/RegisterForm';
export default function RegisterPage() {
  return (
    <Layout>
      <section className='container'>
        <RegisterForm />
      </section>
    </Layout>
  );
}
