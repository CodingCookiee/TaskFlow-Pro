import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    "Smart task prioritization",
    "Real-time collaboration",
    "Intuitive workflow design",
    "Progress analytics",
    "Custom notifications"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[85vh] flex flex-col items-center justify-center"
    >
      <div className="max-w-4xl px-6 text-center">
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-black-100/5 dark:bg-white-500/5 text-black-300 dark:text-white-700">
            <Sparkles className="h-4 w-4 mr-2" />
            Welcome to the future of task management
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl font-bold mb-6 bg-gradient-to-r from-black-100 to-violet-300 dark:from-white-700 dark:to-white bg-clip-text text-transparent"
        >
          Streamline Your Workflow with TaskFlow Pro
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-black-500 dark:text-white-500 mb-12"
        >
          Experience seamless task management designed for modern teams
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center space-x-2 bg-black-100/5 dark:bg-white-500/5 p-4 rounded-xl"
            >
              <CheckCircle className="text-violet-300 dark:text-white-700" />
              <span className="text-black-300 dark:text-white-700">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="space-x-4">
          {!session ? (
            <>
              <Link href="/auth/signin" prefetch>
                <Button variant="ghost" 
                  className="text-black-300 dark:text-white-800 hover:bg-black-100/10 dark:hover:bg-white-500/10 
                  transition-all duration-300 rounded-xl px-8 py-6 text-lg">
                  Explore More
                </Button>
              </Link>
              <Link href="/auth/signup" prefetch>
                <Button 
                  className="bg-black-200 hover:bg-black-300 dark:bg-white text-white dark:text-black-200 
                  dark:hover:bg-white-800 transition-all duration-300 rounded-xl px-8 py-6 text-lg">
                  Get Started
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard" prefetch>
              <Button 
                className="bg-black-200 hover:bg-black-300 dark:bg-white text-white dark:text-black-200 
                dark:hover:bg-white-800 transition-all duration-300 rounded-xl px-8 py-6 text-lg">
                Go to Dashboard
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
