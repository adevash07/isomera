import styled from 'styled-components';
import * as React from 'react';
import Head from 'next/head';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <>
      <Head>
        <title>Next App</title>
      </Head>
      <StyledPage>
        <h1>Isomera</h1>
      </StyledPage>
    </>
  );
}

export default Index;

const StyledPage = styled.div``;
