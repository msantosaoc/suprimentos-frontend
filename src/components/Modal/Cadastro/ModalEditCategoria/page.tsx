import React, { useState, useEffect, useContext } from 'react'
import { Button, ModalHeader, ModalBody, ModalFooter, Modal, Form, Row, Col, Label, InputGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from 'reactstrap';

interface Props {
    isOpen: boolean;
    toggle: () => void;
    loading: boolean;
}

export default function ({ isOpen, toggle, loading }: Props) {



    return (
        <Modal size='md' isOpen={isOpen} toggle={toggle} className="">
            <div className="md:w-full flex-col justify-between pb-2 pt-8 px-8 bg-white rounded-xl border-none shadow-xl">
                <div className="border-b w-full ">
                    <h1 className="text-2xl text-title font-semibold">Editar Categoria</h1>
                </div>
            </div>
        </Modal>
    )
}