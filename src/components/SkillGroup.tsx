import { SkillGroup } from '@utils/contentful'
import { Entry } from 'contentful'
import React from 'react'
import Skill from './Skill'

const SkillGroupItem = ({ skillProgress, skills, title }: SkillGroup) => {
    return (
        <div>
            <div
                key={title}
                className="grid items-center grid-cols-2 p-1 py-4 md:p-4 md:px-4 lg:px-5"
            >
                <div className="flex gap-4 text-xl md:text-4xl">
                    {skills.map((icon: string) => (
                        <Skill skillName={icon} />
                    ))}
                </div>
                <div className="relative w-full h-1 bg-gray-600 rounded-2xl">
                    <div
                        className="absolute top-0 left-0 bg-warning rounded-2xl h-full"
                        style={{ width: `${skillProgress}%` }}
                    >
                        <span className="absolute px-1 py-1 mb-2 text-xs text-white rounded-sm bg-slate-900 -right-4 bottom-full animate-pulse">
                            {skillProgress}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillGroupItem