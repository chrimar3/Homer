'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function AboutPage() {
  const milestones = [
    { year: '1998', title: 'Foundation', description: 'Homer Papadopoulos begins crafting jewelry in Athens' },
    { year: '2005', title: 'First Grillz', description: 'Pioneered custom grillz in Greece' },
    { year: '2012', title: 'Celebrity Recognition', description: 'First international celebrity client' },
    { year: '2018', title: 'Southampton Opening', description: 'Expanded to Southampton, UK' },
    { year: '2024', title: 'Global Reach', description: 'Serving clients in 30+ countries' },
  ];

  const values = [
    {
      icon: '💎',
      title: 'Exceptional Quality',
      description: 'We use only the finest materials and gemstones, ensuring each piece meets the highest standards of luxury.',
    },
    {
      icon: '🎨',
      title: 'Artistic Innovation',
      description: 'Blending traditional craftsmanship with contemporary design to create unique, trendsetting pieces.',
    },
    {
      icon: '🤝',
      title: 'Personal Service',
      description: 'Every client receives dedicated attention with personalized consultations and bespoke solutions.',
    },
    {
      icon: '🌍',
      title: 'Global Excellence',
      description: 'Serving discerning clients worldwide with the same commitment to excellence.',
    },
  ];

  const team = [
    {
      name: 'Homer Papadopoulos',
      role: 'Founder & Master Jeweler',
      image: '/images/team/homer.jpg',
      bio: '25+ years of experience in luxury jewelry',
    },
    {
      name: 'Maria Dimitriou',
      role: 'Head Designer',
      image: '/images/team/maria.jpg',
      bio: 'Award-winning jewelry designer',
    },
    {
      name: 'James Mitchell',
      role: 'Southampton Manager',
      image: '/images/team/james.jpg',
      bio: 'Luxury retail specialist',
    },
    {
      name: 'Sofia Alexandrou',
      role: 'Client Relations',
      image: '/images/team/sofia.jpg',
      bio: 'Dedicated to exceptional service',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-homer-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="font-cinzel text-4xl md:text-6xl font-bold mb-6">
              Crafting Luxury<br />Since 1998
            </h1>
            <p className="text-homer-gray-300 text-lg leading-relaxed">
              Homer The Jeweller represents the pinnacle of custom jewelry craftsmanship. 
              As Greece's first specialized grillz maker and a renowned luxury jeweler, 
              we've been transforming precious metals and gems into wearable art for over two decades.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-cinzel text-3xl font-bold mb-6 text-homer-black">Our Story</h2>
              <div className="space-y-4 text-homer-gray-600">
                <p>
                  Founded by master jeweler Homer Papadopoulos in Athens, our journey began with a 
                  simple vision: to create jewelry that tells a story, captures emotion, and stands 
                  the test of time.
                </p>
                <p>
                  What started as a small workshop in the heart of Athens has grown into an 
                  internationally recognized luxury brand, pioneering custom grillz in Greece and 
                  serving discerning clients across the globe.
                </p>
                <p>
                  Our expansion to Southampton in 2018 marked a new chapter, bringing our unique 
                  blend of Mediterranean craftsmanship and contemporary design to the UK market.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-homer-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/images/about/workshop.jpg"
                  alt="Homer's Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-homer-gold text-white p-6 rounded-lg max-w-xs">
                <p className="font-cinzel text-4xl font-bold">25+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-homer-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-cinzel text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-homer-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-homer-gold hidden md:block"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  <div className="flex-1 text-center md:text-right">
                    {index % 2 === 0 && (
                      <div>
                        <h3 className="font-cinzel text-2xl font-bold text-homer-gold">{milestone.year}</h3>
                        <h4 className="font-semibold text-lg mb-2">{milestone.title}</h4>
                        <p className="text-homer-gray-600">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Center Dot */}
                  <div className="w-4 h-4 bg-homer-gold rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="flex-1 text-center md:text-left">
                    {index % 2 !== 0 && (
                      <div>
                        <h3 className="font-cinzel text-2xl font-bold text-homer-gold">{milestone.year}</h3>
                        <h4 className="font-semibold text-lg mb-2">{milestone.title}</h4>
                        <p className="text-homer-gray-600">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-homer-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel text-3xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-homer-gray-600 mb-12 max-w-2xl mx-auto">
            Our talented team of designers, craftsmen, and specialists work together to bring your vision to life
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square bg-homer-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-cinzel text-lg font-semibold">{member.name}</h3>
                <p className="text-homer-gold text-sm mb-2">{member.role}</p>
                <p className="text-homer-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-homer-gold to-homer-darkGold text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-3xl font-bold mb-4">Experience Homer Excellence</h2>
          <p className="text-homer-lightGold mb-8">
            Visit our showrooms in Athens or Southampton for a personal consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-homer-gold hover:bg-homer-gray-100"
              onClick={() => window.location.href = '/book-consultation'}
            >
              Book Consultation
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-homer-gold"
              onClick={() => window.location.href = '/gallery'}
            >
              View Gallery
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}