"use client";

import React, { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'
import FournisseurLayout from './layout';
import { CircleStackIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

import { doc, collection, setDoc, addDoc, getDoc, query, onSnapshot } from "firebase/firestore";
import { db } from '@/config/firebase';

const features = [
	{
		name: 'Fourniseur 0 - FN0.',
		description: 'Description sur le fournisseur.',
		icon: CircleStackIcon,
	},
	{
		name: 'Fournisseur 2 - FN2.',
		description: 'Description sur le fournisseur.',
		icon: CircleStackIcon,
	},
	{
		name: 'Fournisseur 1 - FN1.',
		description: 'Description sur le fournisseur.',
		icon: CircleStackIcon,
	},
]


export default function Fournisseurs() {
	// const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [values, setValues] = useState({ libelle: '', adresse: '', description: '', tel: '' });
	const [datas, setDatas] = useState([])

	const onSaveForm = async (data) => {
		console.log("data =>", data);

		// Add a new document with a generated id.
		await addDoc(collection(db, "fournisseurs"), {
			libelle: data?.libelle,
			description: data?.description,
			telephone: data?.tel,
			adresse: data?.adresse
		}).then((response) => {
			alert("Fournisseur crée !")
		}).catch((error) => {
			console.error(error);
		}).finally(() => {
			setValues({ ...values, adresse: '', description: '', tel: '', libelle: '' });
		});
		//   console.log("Document written with ID: ", docRef.id)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		onSaveForm(values);
	}

	const q = query(collection(db, 'fournisseurs'))


	// Fecth dats from db
	useEffect(() => {
		const fecthData = onSnapshot(q, (querySnapshot) => {
			let fournisseurListe = []

			querySnapshot.forEach((doc) => {
				fournisseurListe.push({ ...doc.data(), icon: CircleStackIcon, id: doc.id })
			})

			console.log("fournisseurs=>", fournisseurListe)
			setDatas(fournisseurListe)
		})

	}, [])



	return (
		<FournisseurLayout>
			<div className="overflow-hidden ">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
						<div className="lg:pr-8 lg:pt-4">
							<div className="lg:max-w-lg">
								<button
									href="#"
									className="rounded-md mb-3 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									Nouveau fournisseur
								</button>
								{/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Nouveau fournisseur </h2> */}
								<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Fournisseur </p>
								<p className="mt-6 text-lg leading-8 text-gray-600">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
									iste dolor cupiditate blanditiis ratione.
								</p>

								<div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
									{datas.map((feature) => (
										<div key={feature?.id} className="relative pl-9">
											<dt className="inline font-semibold text-gray-900">
												<feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
												{feature?.libelle}
											</dt>{' '}
											<p><span className="inline">{feature?.description}</span></p>
										</div>
									))}
								</div>

							</div>

						</div>
						{/* <img
								src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
								alt="Product screenshot"
								className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
								width={2432}
								height={1442}
							/> */}

						<form className='' onSubmit={handleSubmit}>
							<div className="w-[48rem] max-w-none space-y-12">
								<div className="border-b border-gray-900/10 pb-12">
									<h2 className="text-base font-semibold leading-7 text-gray-900">Profil du fournisseur </h2>
									<p className="mt-1 text-sm leading-6 text-gray-600">
										Remplir les informations sur le nouveau founisseur.
									</p>

									<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
										<div className="sm:col-span-3">
											<label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
												Nom du fournisseur
											</label>
											<div className="mt-2">
												<input
													type="text"
													name="first-name"
													id="first-name"
													value={values?.libelle}
													onChange={(e) => setValues({ ...values, libelle: e.target.value })}
													autoComplete="given-name"
													className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-3">
											<label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
												Téléphone fournisseur
											</label>
											<div className="mt-2">
												<input
													type="text"
													name="last-name"
													id="last-name"
													value={values?.tel}
													onChange={(e) => setValues({ ...values, tel: e.target.value })}
													autoComplete="family-name"
													className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
									</div>
									<div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
										<div className="sm:col-span-4">
											<label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
												Adresse du fournisseur
											</label>
											<div className="mt-2">
												<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
													{/* <span className="flex select-none items-center  pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
													<input
														type="text"
														name="username"
														id="username"
														value={values?.adresse}
														onChange={(e) => setValues({ ...values, adresse: e.target.value })}
														autoComplete="username"
														className="block flex-1 border-0 bg-white w-full py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
														placeholder="janesmith"
													/>
												</div>
											</div>
										</div>

										<div className="col-span-full">
											<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
												Description fournisseur
											</label>
											<div className="mt-2">
												<textarea
													id="about"
													onChange={(e) => setValues({ ...values, description: e.target.value })}
													name="about"
													value={values?.description}
													rows={3}
													className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													defaultValue={''}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button
								type='submit'
								className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
								Créer le fournisseur
							</button>
						</form>
					</div>
				</div>
			</div>
		</FournisseurLayout>

	)
}

