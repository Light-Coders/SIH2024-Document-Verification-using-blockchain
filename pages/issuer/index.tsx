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
	const { contract, connectedAddress } = useContract()

	console.log("asdf", contract)

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


		try {
			console.log(contract);

			if (!contract) {
				console.log("Contract not found");
				return;
			}
			const tx = await contract?.issueDocument(_to, _URI, _issuer, _connectedAddress, _documentType);
			//await tx.wait();
			console.log("NFT Issued Successfully", tx);
		} catch (error) {
			console.log(error);
		}
	}

	async function makeJsonFile() { // function takes all the inputs and makes a json file
		const jsonData = {
			ethAddress: ethAddress,
			holderName: holderName,
			docType: docType,
			masterKey: masterKey,
		};
		const jsonString = JSON.stringify(jsonData);
		fs.writeFileSync('metadata.json', jsonString);
	}

	async function uploadMetadataToIpfs() {	  // uploads metadata file to json and returns the URI of that json file
		return;
	}

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
						onClick={async () => await generateNft(ethAddress, "uri", "issuer", connectedAddress as string, docType)}
					>
						UPLOAD FILE
					</Button>
				</Group>
			</Container>
		</>
	)
}

export default Index
