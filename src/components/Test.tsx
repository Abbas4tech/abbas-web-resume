import { SkillSet, UnwrapEntry } from '@utils/contentful'
import { Entry } from 'contentful'
import React from 'react'

const Test = ({ title, fields }: UnwrapEntry<Entry<SkillSet>>) => {
    return (
        <div>
            {title}
        </div>
    )
}

export default Test