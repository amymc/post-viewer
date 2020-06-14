import React from 'react'
import { css } from 'emotion'

const notFound = css`
  font-weight: 700;
  font-size: 30px;
  color: #ee5b21;
  align-self: center;
  margin: 0 auto;
`

const NotFound = () => (
  <section className={notFound}>
    Error! Posts not found!
  </section>
)

export default NotFound;
