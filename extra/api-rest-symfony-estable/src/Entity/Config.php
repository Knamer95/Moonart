<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Config
 *
 * @ORM\Table(name="config", indexes={@ORM\Index(name="fk_user_config", columns={"user_id"})})
 * @ORM\Entity
 */
class Config
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="night_mode", type="boolean", nullable=true, options={"default"="0"})
     */
    private $night_mode = '0';

    /**
     * @var bool|null
     *
     * @ORM\Column(name="nsfw", type="boolean", nullable=true, options={"default"="0"})
     */
    private $nsfw = '0';

    /**
     * @var bool|null
     *
     * @ORM\Column(name="epilepsy", type="boolean", nullable=true, options={"default"="0"})
     */
    private $epilepsy = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="lang", type="integer", nullable=true, options={"default"="1"})
     */
    private $lang;

    /**
     * @var string
     *
     * @ORM\Column(name="color", type="string", length=12, nullable=true, options={"default"="blue"})
     */
    private $color;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="share", type="boolean", nullable=true, options={"default"="1"})
     */
    private $share = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="feed", type="integer", nullable=true, options={"default"="15"})
     */
    private $feed;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="config")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNightMode(): ?bool
    {
        return $this->night_mode;
    }

    public function setNightMode(?bool $night_mode): self
    {
        $this->night_mode = $night_mode;

        return $this;
    }

    public function getNsfw(): ?bool
    {
        return $this->nsfw;
    }

    public function setNsfw(?bool $nsfw): self
    {
        $this->nsfw = $nsfw;

        return $this;
    }

    public function getEpilepsy(): ?bool
    {
        return $this->epilepsy;
    }

    public function setEpilepsy(?bool $epilepsy): self
    {
        $this->epilepsy = $epilepsy;

        return $this;
    }

    public function getLang(): ?string
    {
        return $this->lang;
    }

    public function setLang(string $lang): self
    {
        $this->lang = $lang;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }


    public function getShare(): ?bool
    {
        return $this->share;
    }

    public function setShare(?bool $share): self
    {
        $this->share = $share;

        return $this;
    }


    public function getFeed(): ?int
    {
        return $this->feed;
    }


    public function setFeed(?int $feed): self
    {
        $this->feed = $feed;

        return $this;
    }


    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }


}
