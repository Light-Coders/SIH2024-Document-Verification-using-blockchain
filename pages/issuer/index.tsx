import FileDrop from '../../components/FileDrop'
import { Button, Container, Group, TextInput } from '@mantine/core'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useContract } from '../../contexts/ContractContext'
import { ethers } from 'ethers'
import { ContractProvider } from '../../contexts/ContractContext'

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
	const { contract, connectedAddress, setContract } = useContract()

	function uploadToIpfs() {
		return;
	}

	function uploadMetadataToIpfs() {
		return;
	}

	async function generateNft(
		_to: string,
		_URI: string,
		_issuer: string,
		_connectedAddress: string,
		_documentType: string,
	) {
		if (!contract) {
			console.log("Contract not found");
		}
		try {
			console.log(contract);
			const tx = await contract?.issueDocument(_to, _URI, _issuer, _connectedAddress, _documentType);
			// await tx.wait();
			console.log("NFT Issued Successfully");
		} catch (error) {
			console.log(error);
		}

	}

	return (
		<ContractProvider>
			<Navbar contract={contract} setContract={setContract} />
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
						onClick={() => generateNft(ethAddress, "uri", "issuer", connectedAddress as string, docType)}
					>
						UPLOAD FILE
					</Button>
				</Group>
			</Container>
		</ContractProvider>
	)
}

export default Index
