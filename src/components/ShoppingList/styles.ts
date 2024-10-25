import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

export const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 8px;
    font-size: 1rem;
  }

  button {
    padding: 8px 16px;
    background-color: #0070f3;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #005bb5;
    }
  }
`
