import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  title: string;
  outcome: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  features: string[];
}

interface MagicBentoProps {
  services: Service[];
}

const MagicBento: React.FC<MagicBentoProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className={`
            relative overflow-hidden rounded-3xl p-8 border shadow-xl
            bg-gradient-to-br ${service.bgColor} ${service.borderColor}
            group cursor-pointer
          `}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-lg"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              {service.icon}
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              {service.description}
            </p>

            {/* Outcome */}
            <p className={`text-lg font-semibold mb-6 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
              Outcome: {service.outcome}
            </p>

            {/* Features */}
            <ul className="space-y-3">
              {service.features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start text-slate-700 group-hover:text-slate-800 transition-colors"
                >
                  <span className={`text-${service.color.split('-')[1]}-500 mr-3 mt-1 text-lg`}>•</span>
                  <span className="text-sm leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default MagicBento;
