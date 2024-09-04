import { Container } from '@mantine/core'
import React from 'react'
import Navbar from '../../components/Navbar'
import CardComponent from '../../components/CardComponent'

const IssuedDocuments = () => {
	return (
		<>
			<Navbar />
			<Container>
				<CardComponent
					documentName="Aadhaar Card"
					documentIssuer="UIDAI"
					ethAddress="asdfadf"
					documentHolder="Akshat Patil"
				/>
			</Container>
		</>
	)
}

export default IssuedDocuments
