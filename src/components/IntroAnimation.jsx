
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';
import ParticlesBackground from './ParticlesBackground';
import GalaxyBackground from './GalaxyBackground';

export default function IntroAnimation({onFinish}) {

  const greetings = useMemo(() => [
    "Hello", "नमस्ते", "Hola", "Bonjour",
      "Ciao", "Olá", "Здравствуйте",
      "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
  ], [])

  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    if(index < greetings.length-1) {
      const id = setInterval(() => setIndex((i) => i+1), 180);
      return () => clearInterval(id);
    } else {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length])
  return(
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
        className='fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden'
        initial={{y:0}}
        exit={{y:"-100%", 
          transition:{
          duration:1.05, 
          ease: [0.22, 1, 0.36, 1],
          },
        }}>
          
          {/* Galaxy Background */}
          <div className="absolute inset-0 z-0">
            <GalaxyBackground />
          </div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.h1
  key={index}
  className="relative z-20 text-5xl md:text-7xl lg:text-8xl font-bold text-white"
  style={{
    textShadow: `
      0 0 8px rgba(255,255,255,0.9),
      0 0 16px rgba(255,255,255,0.7),
      0 0 28px rgba(120,180,255,0.7)
    `
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.12 }}
>
  {greetings[index]}
</motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}