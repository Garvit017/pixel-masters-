import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Cloud, Palette, Award, MapPin, Calendar, GraduationCap } from 'lucide-react';
import { personalInfo, skills, experience, education } from '../data/portfolioData';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = {
    frontend: { icon: Code, color: 'text-blue-500', bgColor: 'bg-blue-100' },
    backend: { icon: Database, color: 'text-green-500', bgColor: 'bg-green-100' },
    database: { icon: Database, color: 'text-orange-500', bgColor: 'bg-orange-100' },
    devops: { icon: Cloud, color: 'text-purple-500', bgColor: 'bg-purple-100' },
    design: { icon: Palette, color: 'text-pink-500', bgColor: 'bg-pink-100' },
    other: { icon: Award, color: 'text-gray-500', bgColor: 'bg-gray-100' },
  };

  const getSkillLevel = (level: string) => {
    const levels = {
      beginner: { width: '25%', color: 'bg-red-500' },
      intermediate: { width: '50%', color: 'bg-yellow-500' },
      advanced: { width: '75%', color: 'bg-blue-500' },
      expert: { width: '100%', color: 'bg-green-500' },
    };
    return levels[level as keyof typeof levels] || levels.beginner;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate about creating exceptional digital experiences and solving complex problems through code.
            </p>
          </motion.div>

          {/* Personal Info */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Hello, I'm John Doe</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I'm passionate about building scalable applications and creating user experiences that make a difference. 
                When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
                or sharing knowledge with the developer community.
              </p>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Available for work</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl transform rotate-3"></div>
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Skills & Technologies</h3>
              <p className="text-lg text-gray-600">
                A comprehensive overview of my technical expertise and proficiency levels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skillCategories).map(([category, config]) => {
                const categorySkills = skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;

                const Icon = config.icon;
                
                return (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${config.bgColor}`}>
                        <Icon className={`w-6 h-6 ${config.color}`} />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 capitalize">
                        {category}
                      </h4>
                    </div>
                    
                    <div className="space-y-3">
                      {categorySkills.map((skill) => {
                        const levelConfig = getSkillLevel(skill.level);
                        return (
                          <div key={skill.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                {skill.icon} {skill.name}
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {skill.level}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: levelConfig.width } : { width: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={`h-2 rounded-full ${levelConfig.color}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Experience & Education */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Experience</h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-purple-600 font-medium">{exp.company}</p>
                        <p className="text-gray-600 text-sm">{exp.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {exp.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                          {exp.current ? 'Present' : exp.endDate?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          exp.type === 'full-time' ? 'bg-green-100 text-green-800' :
                          exp.type === 'freelance' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{exp.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Education</h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-purple-600 font-medium">{edu.field}</p>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {edu.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                          {edu.endDate?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
