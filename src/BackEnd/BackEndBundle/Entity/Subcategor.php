<?php

namespace BackEnd\BackEndBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity
 * @ORM\Table(name="Subcategor")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Subcategor
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @ORM\Column(type="string")
     */
    protected $categorId;
    /**
     * @ORM\Column(type="string")
     */
    protected $subcategorId;
    /**
     * @ORM\Column(type="string")
     */
    protected $subcategorName;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set categorId
     *
     * @param string $categorId
     * @return Subcategor
     */
    public function setCategorId($categorId)
    {
        $this->categorId = $categorId;

        return $this;
    }

    /**
     * Get categorId
     *
     * @return string 
     */
    public function getCategorId()
    {
        return $this->categorId;
    }

    /**
     * Set subcategorId
     *
     * @param string $subcategorId
     * @return Subcategor
     */
    public function setSubcategorId($subcategorId)
    {
        $this->subcategorId = $subcategorId;

        return $this;
    }

    /**
     * Get subcategorId
     *
     * @return string 
     */
    public function getSubcategorId()
    {
        return $this->subcategorId;
    }

    /**
     * Set subcategorName
     *
     * @param string $subcategorName
     * @return Subcategor
     */
    public function setSubcategorName($subcategorName)
    {
        $this->subcategorName = $subcategorName;

        return $this;
    }

    /**
     * Get subcategorName
     *
     * @return string 
     */
    public function getSubcategorName()
    {
        return $this->subcategorName;
    }
}
