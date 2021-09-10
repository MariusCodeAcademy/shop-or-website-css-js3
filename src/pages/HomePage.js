import Hero from '../components/Sections/Hero';
import Collections from '../components/Sections/Collections/Collections';
import Shop from '../components/Sections/Shop/Shop';
import Blog from '../components/Sections/Blog/Blog';
import Cta from '../components/Sections/CTA/Cta';
import Shipping from '../components/Sections/Shipping/Shipping';
import { useRef, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';

export default function HomePage() {
  const blogRef = useRef();
  const asideRef = useRef();

  const [asideStick, setAsideStick] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  function handleScroll() {
    console.log('handleScroll');
    const asideTopDistance = asideRef.current.getBoundingClientRect().top;
    const asideBottomDistance = asideRef.current.getBoundingClientRect().bottom;
    const blogTopDistance = blogRef.current.getBoundingClientRect().top;
    // console.log({ asideTopDistance });
    // console.log({ asideBottomDistance });
    // console.log({ blogTopDistance });

    // normali busena
    // aside sicky
    // nuimti nuo aside stiky esant zemiau

    if (asideTopDistance < 85) {
      console.log('stick');

      if (asideBottomDistance > blogTopDistance) {
        console.log('aside bottom reach NOT');
        setAsideStick(false);
        return;
      }

      setAsideStick(true);
    } else {
      // console.log('stick NOT');
      // setAsideStick(false);
    }
  }

  function btnHandler() {
    console.log('blog top', blogRef.current.getBoundingClientRect().top);
    console.log('aside', asideRef.current.getBoundingClientRect().top);
  }
  return (
    <Layout page='home'>
      <Hero />
      <Collections />
      <Shop asideStick={asideStick} ref={asideRef} />
      <Blog ref={blogRef} qty='2' />
      <Cta />
      <Shipping />
    </Layout>
  );
}
