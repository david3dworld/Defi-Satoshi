import React, { useState } from "react";
import styled from "styled-components";
import { setConstantValue } from "typescript";

const Item = styled.span`
    display: inline-block;
    margin: 0 15px;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    color: #fff;
    height: 30px;
    vertical-align: middle;
    line-height: 20px;

    &:before {
        content: '';
        position: absolute;
        border: solid 1px #888;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        left: 0;
        top: 0;
        display: block;
    }

    &.selected::after {
        content: '';
        left: 5px;
        top: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        background-color: #fff;
        position: absolute;
    }
`;

const RadioGroup = (props) => {
    const { fields, onChange, value, style } = props;

    const [selected, setSelected] = useState(value);

    const onSelect = (field) => {
        setSelected(field.value);
        // eslint-disable-next-line
        onChange && onChange(field.value);
    }

    return <div style={style} >
        {
            fields.map((field, i) => <Item key={`radio-ite-${field.value}`} className={field.value===selected?'radio-item selected':'radio-item'} onClick={()=>onSelect(field)} >
                {field.name}
            </Item>)
        }
    </div>
}

export default RadioGroup;
