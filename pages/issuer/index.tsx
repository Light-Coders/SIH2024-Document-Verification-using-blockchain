import FileDrop from '../../components/FileDrop'
import { Button, Container, Group, TextInput } from '@mantine/core'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Navbar from '../../components/Navbar'

type InputProps = {
	label: string
	value: string | any | null
	setValue: Dispatch<SetStateAction<string | any | null>>
}

const Input = ({ label, value, setValue }: InputProps) => {
	return (
		<TextInput
			label={label}
			radius="md"
			withAsterisk
			value={value}
			labelProps={{
				style: {
					paddingBottom: 12,
					color: '#676767',
					fontWeight: 600,
				},
			}}
			onChange={(event) => setValue(event.currentTarget.value)}
		/>
	)
}

const Index = () => {
	const [ethAddress, setEthAddress] = useState('')
	const [holderName, setHolderName] = useState('')
	const [docType, setDocType] = useState('')
	const [masterKey, setMasterKey] = useState('')

	return (
		<>
			<Navbar />
			<Container>
				<FileDrop />
				<Input
					label="Document Owner ETH Address"
					value={ethAddress}
					setValue={setEthAddress}
				/>
				<Input
					label="Document Holder Name"
					value={holderName}
					setValue={setHolderName}
				/>
				<Input
					label="Document Type"
					value={docType}
					setValue={setDocType}
				/>
				<Input
					label="Master Key of the Document Holder"
					value={masterKey}
					setValue={setMasterKey}
				/>
				<Group justify="center" mt="md">
					<Button
						style={{
							backgroundColor: '#4262FF',
							textAlign: 'center',
						}}
					>
						UPLOAD FILE
					</Button>
				</Group>
			</Container>
		</>
	)
}

export default Index
