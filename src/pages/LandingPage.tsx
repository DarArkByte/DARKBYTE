/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BarChart3, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-gray-900 border-none transition-all duration-300">
            Dar-Ark <span className="text-indigo-600">Byte</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-gray-600 font-medium hover:text-indigo-600 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-sans font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              The Modern Operating System for <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Nigerian Schools.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mb-10">
              A comprehensive multi-tenant SaaS for automated result management, effortless parent communication, and organized termly planning.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 group shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all"
              >
                Launch Your School <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:border-indigo-200 transition-all">
                Book a Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-indigo-50 rounded-3xl p-8 aspect-square relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                 <div className="bg-white rounded-2xl shadow-2xl p-6 border border-indigo-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-4 w-32 bg-gray-100 rounded-full" />
                      <div className="h-8 w-8 bg-indigo-100 rounded-full" />
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4">
                          <div className="h-10 w-10 bg-gray-50 rounded-lg shrink-0" />
                          <div className="flex-1 space-y-2 py-1">
                            <div className="h-3 bg-gray-100 rounded-full w-3/4" />
                            <div className="h-2 bg-gray-50 rounded-full w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
               {/* Abstract decorative elements */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50" />
               <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-emerald-200 rounded-full blur-3xl opacity-30" />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mt-40 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<BarChart3 className="text-indigo-600" />}
            title="Result Management"
            description="Automated CA/Exam processing, custom grading scales, and professional PDF report cards reachable in seconds."
          />
          <FeatureCard 
            icon={<Users className="text-indigo-600" />}
            title="Multi-Tenant Architecture"
            description="Scalable infrastructure supporting thousands of schools with independent data isolation and branding."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-indigo-600" />}
            title="Secure Workflows"
            description="Role-based access control, Vetting system for error detection, and multi-stage result approval."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
      <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-sans font-bold text-xl text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed font-sans">{description}</p>
    </div>
  );
}
